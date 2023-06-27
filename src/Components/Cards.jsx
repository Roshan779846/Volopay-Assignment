import React, { useState, useEffect } from "react";
import "./Cards.css";
import "@fortawesome/fontawesome-free/css/all.css";

const Cards = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Your");
  

  useEffect(() => {
    fetch("http://localhost:3005/data")
      .then((response) => response.json())
      .then((data) => {
        setCards(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching cards:", error));
  }, []);

    

    const filteredCards = cards.filter((card) => {
      if (activeTab === "Your") {
        return [1].includes(card.owner_id); // Show cards for owner IDs 1, 2, and 3
      } else if (activeTab === "All") {
        return [1, 2, 3].includes(card.owner_id);; // Show all cards
      } else if (activeTab === "Blocked") {
        return card.status === "blocked"; // Show blocked cards
      }
      return false;
    });
  


  return (
    <div className="cards-container">
      <div className="tabs">
        <button
          className={`tab ${activeTab === "Your" ? "active" : ""}`}
          onClick={() => setActiveTab("Your")}
        >
          Your
        </button>
        <button
          className={`tab ${activeTab === "All" ? "active" : ""}`}
          onClick={() => setActiveTab("All")}
        >
          All
        </button>
        <button
          className={`tab ${activeTab === "Blocked" ? "active" : ""}`}
          onClick={() => setActiveTab("Blocked")}
        >
          Blocked
        </button>
      </div>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="card-list">
          {filteredCards.map((card) => (
            <div className="card" key={card.name}>
              <div className="card-header">
                {/* <span>
                  {card.card_type === "burner"
                  ? (
                    <i className="fas fa-fire"></i> // Add fire icon for burner and subscription cards
                  ) : null}
                </span> */}

                <span className={`card-type ${card.card_type}`}></span>
                {card.card_type}
              </div>
              <div className="card-content">
                <h3>{card.name}</h3>
                <p>Budget: {card.budget_name}</p>
                {card.card_type === "burner" ? (
                  <p>Expiry: {card.expiry}</p>
                ) : (
                  <p>Limit: {card.limit}</p>
                )}
                <p>
                  Spent: {card.spent.value} {card.spent.currency}
                </p>
                <p>
                  Available to spend: {card.available_to_spend.value}{" "}
                  {card.available_to_spend.currency}
                </p>
                <p>Status: {card.status}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cards;


