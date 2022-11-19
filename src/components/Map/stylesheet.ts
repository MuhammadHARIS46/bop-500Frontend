import { styled } from "@mui/material";

export const GlobalStyle = styled("div")(
  () => `
    font-family: ff-clan-web-pro, "Helvetica Neue", Helvetica, sans-serif;
    font-weight: 400;
    font-size: 0.875em;
    line-height: 1.71429;
    *,
    *:before,
    *:after {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    }
    ul {
    margin: 0;
    padding: 0;
    }
    li {
    margin: 0;
    }
    a {
    text-decoration: none;
    }
`
);

export const MapContainer = styled("div")(
  () => `
    transition: margin 1s, height 1s;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
`
);
