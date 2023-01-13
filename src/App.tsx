import * as React from "react"
import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react"
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Main from "./main/Main";
import Layout from "./main/layout/Layout";

export const App = () => (
  <ChakraProvider theme={theme}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/main" element={<Main/>}/>
        <Route path="/authorization" element={<Layout/>}/>
      </Routes>
    </BrowserRouter>
  </ChakraProvider>
)
