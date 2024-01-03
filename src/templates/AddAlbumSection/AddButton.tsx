interface AddButtonPropsType {
  title: string;
  handleInputTitle: (v: string) => void;
}

const AddButton = ({ title, handleInputTitle }: AddButtonPropsType) => {
  const handleClick = async () => {
    if (title === "") {
      alert("제목을 입력해주세요.");
      return;
    }
    handleInputTitle("");
    console.log(title);
  };
  return <button onClick={handleClick}>만들기</button>;
};

export default AddButton;
