const useDocId = () => {
  const year = new Date().getFullYear().toString();
  const month = new Date().getMonth().toString();
  const date = new Date().getDate().toString();
  const time = new Date().getTime().toString();

  const formatedDate = `post_${year}_${month}_${date}_${time}`;

  return formatedDate;
};

export default useDocId;
