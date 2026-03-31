import { useState, useRef, useCallback, useEffect } from 'react';
import DownloadButton from './ui/DownloadButton';

/** Served from `public/` — add the PDF file with this exact name. */
const COMPANY_PROFILE_HREF = '/Logix Contact Company Profile.pdf';
const COMPANY_PROFILE_FILENAME = 'Logix Contact Company Profile.pdf';

export default function FooterCompanyProfileDownload() {
  const [downloadStatus, setDownloadStatus] = useState('idle');
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);

  const clearTimers = useCallback(() => {
    if (intervalRef.current != null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => () => clearTimers(), [clearTimers]);

  const triggerFileDownload = useCallback(() => {
    const a = document.createElement('a');
    a.href = encodeURI(COMPANY_PROFILE_HREF);
    a.download = COMPANY_PROFILE_FILENAME;
    a.rel = 'noopener';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }, []);

  const handleClick = useCallback(() => {
    if (downloadStatus !== 'idle') return;

    setDownloadStatus('downloading');
    setProgress(0);

    intervalRef.current = window.setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 100;
        }
        const next = Math.min(100, prev + 5);
        if (next >= 100) {
          clearTimers();
          triggerFileDownload();
          setDownloadStatus('downloaded');
          window.setTimeout(() => setDownloadStatus('complete'), 1500);
          window.setTimeout(() => {
            setDownloadStatus('idle');
            setProgress(0);
          }, 1600);
        }
        return next;
      });
    }, 200);
  }, [downloadStatus, clearTimers, triggerFileDownload]);

  return (
    <div className="footer__profile-download">
      <p className="footer__profile-download-label">Company profile</p>
      <DownloadButton
        downloadStatus={downloadStatus}
        progress={progress}
        onClick={handleClick}
        className="footer__profile-download-btn"
      />
    </div>
  );
}
