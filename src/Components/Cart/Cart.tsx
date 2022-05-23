import { Wrapper } from "./Cart.styles";
import CartItem from "../CartItem/CartItem";
import { CartItemType } from "../../interfaces/CartItem";
import { Button, CircularProgress } from "@material-ui/core";
import UserService from "../../services/user.service";
import { useState } from "react";
import { ToastContainer, toast, Flip } from "react-toastify";

type CartProps = {
  cartItems: CartItemType[];
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
  setCartOpen: (val: boolean) => void;
  setCartItems: (value: CartItemType[]) => void;
};

const calculateTotal = (items: CartItemType[]) =>
  items.reduce((acc: number, item) => acc + item.amount * item.price, 0);

const Cart: React.FC<CartProps> = ({
  cartItems,
  addToCart,
  removeFromCart,
  setCartItems,
}): JSX.Element => {
  const totalAmount = calculateTotal(cartItems);
  const [isLoading, setIsLoading] = useState(false);
  const payment = () => {
    setIsLoading(true);
    UserService.payment(cartItems)
      .then((response) => {
        toast.success('payment succeed', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: 0,
          toastId: "card",
        });
        setCartItems([]);
      })
      .catch((error) => {
        toast.success('payment failed', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: 0,
          toastId: "card",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Wrapper>
      <h2 className="title">Your shopping cart</h2>
      {cartItems.length === 0 ? <p className="desc">No item in cart.</p> : null}
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))}

      <h2 className="total">Total: ${totalAmount.toFixed(2)}</h2>
      {totalAmount > 0 && (
        <Button
          size="small"
          disableElevation
          variant="contained"
          onClick={payment}
        >
          {" "}
          Pay{" "}
        </Button>
      )}
      {isLoading && <CircularProgress />}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover
        limit={1}
        transition={Flip}
      />
    </Wrapper>
  );
};

export default Cart;
