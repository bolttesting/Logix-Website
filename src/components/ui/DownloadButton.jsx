import { Download, Loader2, CheckCircle } from 'lucide-react';
import './download-button.css';

/**
 * @param {object} props
 * @param {'idle' | 'downloading' | 'downloaded' | 'complete'} props.downloadStatus
 * @param {number} props.progress
 * @param {() => void} props.onClick
 * @param {string} [props.className]
 */
export default function DownloadButton({ downloadStatus, progress, onClick, className = '' }) {
  const inactive = downloadStatus !== 'idle';

  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'download-button',
        downloadStatus === 'downloading' ? 'download-button--loading' : '',
        inactive ? 'download-button--inactive' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      disabled={inactive}
      aria-busy={downloadStatus === 'downloading'}
    >
      {downloadStatus === 'downloading' && (
        <span
          className="download-button__fill"
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
          aria-hidden
        />
      )}
      <span className="download-button__content">
        {downloadStatus === 'idle' && (
          <>
            <Download size={16} strokeWidth={2} aria-hidden />
            Download
          </>
        )}
        {downloadStatus === 'downloading' && (
          <>
            <Loader2 size={16} strokeWidth={2} className="download-button__spin" aria-hidden />
            {Math.round(progress)}%
          </>
        )}
        {downloadStatus === 'downloaded' && (
          <>
            <CheckCircle size={16} strokeWidth={2} aria-hidden />
            <span>Downloaded</span>
          </>
        )}
        {downloadStatus === 'complete' && (
          <span className="download-button--complete-text">Download</span>
        )}
      </span>
    </button>
  );
}
