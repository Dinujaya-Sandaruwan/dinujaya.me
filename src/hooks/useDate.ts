const useDate = () => {
  const year = new Date().getFullYear().toString();
  const month = new Date().getMonth().toString();
  const date = new Date().getDate().toString();

  const docId = `${year}/${month}/${date}`;

  return docId;
};

export default useDate;
