import { useState } from 'react';
import { uploadMediaFile } from '../../lib/storageUpload';

/**
 * File picker → Supabase Storage → public URL. Falls back to manual URL field.
 */
export default function AdminImageUpload({
  label = 'Image',
  value,
  onChange,
  folder = 'uploads',
  compact = false,
  /** When false, only file upload calls onChange (e.g. append-only gallery). */
  showUrlField = true,
}) {
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState('');

  const onFile = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setErr('Please choose an image file');
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      setErr('Max file size 8 MB');
      return;
    }
    setErr('');
    setUploading(true);
    try {
      const url = await uploadMediaFile(file, folder);
      onChange(url);
    } catch (er) {
      setErr(er.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="admin-form__field admin-upload">
      <label>{label}</label>
      <div className={`admin-upload__row${compact ? ' admin-upload__row--compact' : ''}`}>
        <input
          type="file"
          accept="image/*"
          className="admin-upload__input"
          onChange={onFile}
          disabled={uploading}
        />
        {uploading && <span className="admin-upload__status">Uploading…</span>}
      </div>
      {showUrlField ? (
        <input
          type="url"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Or paste image URL"
          className="admin-upload__url"
        />
      ) : null}
      {value && showUrlField ? (
        <div className="admin-upload__preview">
          <img src={value} alt="" />
          <button type="button" className="admin-btn admin-btn--secondary admin-upload__clear" onClick={() => onChange('')}>
            Remove image
          </button>
        </div>
      ) : null}
      {err ? <p className="admin-upload__error">{err}</p> : null}
    </div>
  );
}
