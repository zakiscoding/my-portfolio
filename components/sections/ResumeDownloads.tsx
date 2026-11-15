import { ChevronDown, Download } from "lucide-react";
export function ResumeDownloads() {
  return (
    <div className="resume-downloads">
      <a
        className="resume-primary"
        href="/resumes/zakariye-mohamed-software.pdf"
        download="Zakariye_Mohamed_Software_Resume.pdf"
      >
        <Download size={16} aria-hidden="true" /> Download resume{" "}
        <span className="resume-format">PDF</span>
      </a>
      <details className="resume-versions">
        <summary>
          Other versions <ChevronDown size={14} aria-hidden="true" />
        </summary>
        <div>
          <a
            href="/resumes/zakariye-mohamed-infrastructure.pdf"
            download="Zakariye_Mohamed_Infrastructure_Resume.pdf"
          >
            Infrastructure resume <Download size={14} aria-hidden="true" />
          </a>
          <a
            href="/resumes/zakariye-mohamed-ai.pdf"
            download="Zakariye_Mohamed_AI_Resume.pdf"
          >
            AI engineering resume <Download size={14} aria-hidden="true" />
          </a>
        </div>
      </details>
    </div>
  );
}
