import React from "react";
import Card from "./Card";
//css
import "./Cards.css";

// images
import book from "../../media/untitled_book.png";
import mathsImg from "../../media/maths.jpeg";
import physicImg from "../../media/physic.png";
import chemistryImg from "../../media/chemistry.jpeg";

// react router
import { useHistory } from "react-router-dom";

const Cards = () => {
  let history = useHistory();
  let handleCreateClick = () => {
    history.push("/desk/create");
  };
  // testing purpose
  const recents = [
    {
      title: "maths",
      src: mathsImg,
    },
    {
      title: "physics",
      src: physicImg,
    },
    {
      title: "chemistry",
      src: chemistryImg,
    },
  ];

  return (
    <div>
      <div className="cardInfo">
        <p className="textNew">New</p>
        <p className="textRecent">recent</p>
      </div>
      <div className="Cards">
        <Card
          key={-1}
          title="Create Book"
          src={book}
          className="createCard"
          handleCreateClick={handleCreateClick}
        />

        <>
          {recents.map((card, id) => (
            <Card key={id} title={card.title} src={card.src} />
          ))}
        </>
      </div>
    </div>
  );
};

export default Cards;
