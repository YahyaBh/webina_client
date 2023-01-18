import cookie from "js-cookie";
import { Navigate, Route } from "react-router-dom";

function PrivateRoute({ children, ...rest }) {
  let token = cookie.get("token");
  ;
  return (
    <Route
      {...rest}
      render={({ location }) =>
        cookie ? (
          children
        ) : (
          <Navigate
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;