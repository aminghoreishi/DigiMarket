import Navbar from "./Navbar";
import Description from "./Description";
import Specifications from "./Specifications";
import CommentContainer from "./Comment/CommentContainer";
import RelatedPro from "./RelatedPro/RelatedPro";

function MainContainer() {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="mt-5">
        <Description />
      </div>
      <div className="mt-5">
        <Specifications />
      </div>
      <div className="mt-5">
        <CommentContainer />
      </div>
      <div className="mt-5">
        <RelatedPro />
      </div>
    </div>
  );
}

export default MainContainer;
