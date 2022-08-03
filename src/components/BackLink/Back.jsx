import { Link } from "react-router-dom";

const Back = () => {
  return (
    <Link to={-1}>
      <div className="Back">
        <div className="Back__svg">
          <svg xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.5557 18L3.00024 10.4446L10.5557 2.88916"
              stroke="black"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div className="Back__value">Назад</div>
      </div>
    </Link>
  );
};

export default Back;
