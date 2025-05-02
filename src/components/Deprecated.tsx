interface DeprecatedProps {
  className?: string;
}
export const Deprecated: React.FC<DeprecatedProps> = ({ className }) => {
  return (
    <div className={`alertText ${className ?? ''}`}>
      Let op: dit overzicht is niet actueel. Kijk op{' '}
      <a
        target="_blank"
        href="https://mijn.ibki.nl/main/pages/bureau_erkenningen/bureau_erkenningen/welkom_bij_bureau_erkenningen/welkom_bij_bureau_erkenningen?context=215bdc7b9e494bcf8e70fc2a15527b7d"
      >
        mijn.ibki.nl
      </a>{' '}
      voor de actuele status.
    </div>
  );
};
