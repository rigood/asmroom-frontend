import Container from "../../components/Container";
import Reviews from "../../components/Reviews";
import RoomNavBar from "../../components/RoomNavBar";
import SubContainer from "../../components/SubContainer";
import { useMe } from "../../hooks/useMe";

const MyReviews = () => {
  const { data: userData } = useMe(false);

  return (
    <Container>
      <RoomNavBar />
      <SubContainer>
        <Reviews reviewerId={userData?.me.id} />
      </SubContainer>
    </Container>
  );
};

export default MyReviews;
