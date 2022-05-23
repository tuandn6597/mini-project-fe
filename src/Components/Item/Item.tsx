import { CartItemType } from "../../interfaces/CartItem";
import { ItemWrapper } from "./item.styles";

type ItemProps = {
  item: CartItemType;
  handleAddToCart: (clickedItem: CartItemType) => void;
};

const Item: React.FC<ItemProps> = ({ item, handleAddToCart }): JSX.Element => (
  <ItemWrapper>
    <div className="card">
      <img src={item.image} className="card-img-top" alt={item.title} />
      <div className="card-body">
        <h4 className="card-title">{item.title}</h4>
        <p className="card-text">{item.description}</p>
        <h5 className="price">${item.price}</h5>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => handleAddToCart(item)}
        >
          Add to cart
        </button>
      </div>
    </div>
  </ItemWrapper>
);

export default Item;
