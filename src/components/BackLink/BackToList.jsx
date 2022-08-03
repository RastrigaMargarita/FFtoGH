import { Link } from "react-router-dom";

const BackToList = () => {
  return (
    <Link
      to={"/pets"}
      style={{
        width: "200px",
        display: "flex",
        position: "relative",
        bottom: "-2rem",
        zIndex: "5",
        left: "1rem",
        marginTop: "-1rem",
        height: "3rem",
      }}
    >
      <div style={{ marginRight: "1rem" }}>
        <svg
          width="13"
          height="20"
          viewBox="0 0 13 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.5557 18L3.00024 10.4446L10.5557 2.88916"
            stroke="black"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div style={{ textAlign: "center", fontWeight: "600" }}>Вернуться к ленте</div>
    </Link>
  );
};

export default BackToList;
