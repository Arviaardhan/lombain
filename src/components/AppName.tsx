export default function AppName(params: { span?: boolean }) {
  const { span } = params;
  return (
    <>
      Lombain
      {span ? (
        <>
          <span className="text-primary">.id</span>
        </>
      ) : (
        <>.id</>
      )}
    </>
  );
}
