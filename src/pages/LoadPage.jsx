import { useNavigate } from "react-router-dom";
import HeaderLoader from "../components/Filter/HeaderLoader";
import { Loader } from "../components";
import { Container } from "@mui/material";

function LoadPage() {
  let navigate = useNavigate();
  setTimeout(() => navigate("/pets"), 5000);

  return (
    <Container
      sx={{
        maxWidth: "360px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "-4rem",
      }}
    >
      <HeaderLoader paddingTop={"80px"} />
      <Loader />
      <p style={{ fontSize: 32, paddingTop: 80 }}>Ищем друзей</p>
    </Container>
  );
}

export default LoadPage;
