function Spinner({
  userLoading = false,
  paddingSmall = false,
}: {
  userLoading?: boolean;
  paddingSmall?: boolean;
}) {
  return (
    <div
      className={`${
        userLoading ? "p-50" : paddingSmall ? "p-5" : "p-10"
      }  flex-center`}
    >
      <div className="loader"></div>
    </div>
  );
}

export default Spinner;
