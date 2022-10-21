export const CardHeader: React.FC = (props) => {
  return (
    <div
      style={{
        fontWeight: 'bold',
        fontSize: '18px',
        margin: '15px 0',
        textTransform: 'uppercase',
      }}
    >
      {props.children}
    </div>
  );
};
