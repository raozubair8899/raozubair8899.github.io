import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type ResumeDownloadButtonProps = {
  className?: string;
  label?: string;
};

const RESUME_URL = '/resume.pdf';
const RESUME_FILE_NAME = 'Rao-Muhammad-Zubair-Resume.pdf';

const ResumeDownloadButton = ({
  className,
  label = 'Download Resume',
}: ResumeDownloadButtonProps) => {
  return (
    <Button
      asChild
      className={cn(
        'h-12 px-6 rounded-xl bg-white text-[#050505] hover:bg-white/90 font-semibold shadow-[0_10px_40px_rgba(255,255,255,0.2)]',
        className
      )}
      data-cursor-hover
    >
      <a
        href={RESUME_URL}
        download={RESUME_FILE_NAME}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Download resume as PDF"
      >
        <Download className="w-4 h-4" />
        <span>{label}</span>
      </a>
    </Button>
  );
};

export default ResumeDownloadButton;
