function Spinner({ userLoading = false }: { userLoading?: boolean }) {
  return (
    <div className={`${userLoading ? "p-50" : "p-10"}  flex-center`}>
      <div className="loader"></div>
    </div>
  );
}

export default Spinner;
