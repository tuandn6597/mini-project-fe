import React, { FC, useState } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import AuthService from "../services/auth.service";
import { LinearProgress } from "@material-ui/core";

type SomeComponentProps = RouteComponentProps;
const SignUp: FC<SomeComponentProps> = ({ history }) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const submitData = (data: any) => {
    setIsLoading(true);
    let params = {
      username: data.username,
      email: data.email,
      password: data.password,
      confirmpassword: data.cpassword,
    };
    AuthService.register(params)
      .then(function (response) {
        const { data, status } = response;
        if (status === 201 || status === 200) {
          reset();
          history.push("/login");
        } else {
          toast.error(data.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: 0,
            toastId: "signUp",
          });
        }
      })
      .catch(function (error) {
        toast.error("user existed", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: 0,
          toastId: "signUp",
        });
      }).finally(() => {
        setIsLoading(false);
      }) 
  };

  if (isLoading) return <LinearProgress />;

  return (
    <>
      <div className="container">
        <div
          className="row d-flex justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <div className="card mb-3 mt-3 rounded" style={{ maxWidth: "500px" }}>
            <div className="col-md-12">
              <div className="card-body">
                <h3 className="card-title text-center text-secondary mt-3 mb-3">
                  Sign Up Form
                </h3>
                <form
                  className="row"
                  autoComplete="off"
                  onSubmit={handleSubmit(submitData)}
                >
                  <div className="col-md-6">
                    <div className="">
                      <label className="form-label">username</label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="exampleFormControlInput1"
                        {...register("username", {
                          required: "username is required!",
                        })}
                      />
                      {errors.username && (
                        <p className="text-danger" style={{ fontSize: 14 }}>
                          {errors.username.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control form-control-sm"
                      id="exampleFormControlInput3"
                      {...register("email", { required: "Email is required!" })}
                    />
                    {errors.email && (
                      <p className="text-danger" style={{ fontSize: 14 }}>
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <div className="">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control form-control-sm"
                      id="exampleFormControlInput5"
                      {...register("password", {
                        required: "Password is required!",
                      })}
                    />
                    {errors.password && (
                      <p className="text-danger" style={{ fontSize: 14 }}>
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                  <div className="">
                    <label className="form-label">Confirm Password</label>
                    <input
                      type="password"
                      className="form-control form-control-sm"
                      id="exampleFormControlInput6"
                      {...register("cpassword", {
                        required: "Confirm Password is required",

                        validate: (value) =>
                          value === watch("password") ||
                          "Passwords don't match.",
                      })}
                    />
                    {errors.cpassword && (
                      <p className="text-danger" style={{ fontSize: 14 }}>
                        {errors.cpassword.message}
                      </p>
                    )}
                  </div>
                  <div className="text-center mt-4 ">
                    <button
                      className="btn btn-outline-primary text-center shadow-none mb-3"
                      type="submit"
                    >
                      Submit
                    </button>
                    <p className="card-text">
                      Already have an account?{" "}
                      <Link style={{ textDecoration: "none" }} to={"/login"}>
                        Log In
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
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
    </>
  );
};

export default SignUp;
