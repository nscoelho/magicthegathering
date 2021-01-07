import './App.css';
import { useState } from 'react';
import Axios from 'axios';

function App() {
  const [cardChosen, setCardChosen] = useState(false);
  const [cardName, setCardName] = useState("");
  const [card, setCard] = useState({
    name: "",
    exactName: "",
    img: "",
    type: "",
    power: "",
    toughness: "",
    manaCost: "",
    rarity: "",
    setName: "",
  });

  const searchCard = () => {
    Axios.get(`https://api.magicthegathering.io/v1/cards?name=${cardName}`)
    .then((response) => {
      console.log(response);
      setCard({
        name: cardName,
        exactName: response.data.cards[0].name,
        img: response.data.cards[0].imageUrl,
        type: response.data.cards[0].type,
        power: response.data.cards[0].power,
        toughness: response.data.cards[0].toughness,
        manaCost: response.data.cards[0].manaCost,
        rarity: response.data.cards[0].rarity,
        setName: response.data.cards[0].setName,
      });
      setCardChosen(true);
    });
  };


  return (
    <div className="App">
      <div className="TitleSection">
        <h1>Magic The Gathering Card Stats</h1>
        <input type="text" onChange= {(event) => {
          setCardName(event.target.value);
          }}
        />
        <button onClick={searchCard}>Search Card</button>
      </div>
      <div className="DisplaySection">
        {!cardChosen ?
        (<h1> Please choose a Card</h1>)
        :
        (
        <>
        <h1>{card.name}</h1>
        <img src={card.img} alt={card.name}/>
        <h3>Exact Name: {card.exactName}</h3>
        <h4>Type: {card.type}</h4>
        <h4>Power: {card.power}</h4>
        <h4>Toughness: {card.toughness}</h4>
        <h4>Mana Cost: {card.manaCost}</h4>
        <h4>Rarity: {card.rarity}</h4>
        <h4>Set Name: {card.setName}</h4>
        <h3><a target="_blank" href="https://www.amazon.com/s?k=magic+the+gathering&amp;ref=nb_sb_noss_2&_encoding=UTF8&tag=nelsonsc-20&linkCode=ur2&linkId=5139fbc50d272b5813d72f61e6a222e2&camp=1789&creative=9325">Buy this card on Amazon</a></h3>
        </>
        )}

      </div>
    </div>
  );
}

export default App;
