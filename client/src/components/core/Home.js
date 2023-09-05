import image from "../../assets/images/welcome.jpg";

const Home = () => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: "8rem",
      }}
    >
      <img alt="Sample" src={image} />
    </div>
  );
};

export default Home;
