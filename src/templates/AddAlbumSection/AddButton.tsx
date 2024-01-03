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
    const res = await fetch("api/createAlbum", {
      method: "POST",
      body: JSON.stringify({
        title,
      }),
    });
    if (!res.ok) {
      alert("다시 시도해주세요!");
      return;
    }
    console.log(res);
    handleInputTitle("");
  };

  return <button onClick={handleClick}>만들기</button>;
};

export default AddButton;
