import React from "react";
import { Formik, Form } from "formik";
import { useDispatch } from "react-redux";
// import axios from "axios";

import InputForm from "./common/inputForm";
import * as funcActions from "../store/func";
import * as parametresActions from "../store/parameters";

const FunctionForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    
    dispatch(funcActions.added(values.func));
    dispatch(parametresActions.added({ fromX: values.fromX, toX: values.toX }));

        // REQUEST FOR WOLFRAMALPHA API
        //AXIOS
    // try {
    //   const response = await axios.get(
    //     "https://api.wolframalpha.com/v2/query?appid=Q8YWEL-U599GTRERR&input=plot+3x-7&format=image&output=json"
    //   );

    //   if (response.status === 200) console.log("response: ", response.status);
    //   else console.log("Something went wrong");
    // } catch (error) {
    //   console.log(error);
    // }

        //FETCH
    // const WolframAlphaAPI = require("wolfram-alpha-api");
    // const waApi = WolframAlphaAPI("Q8YWEL-U599GTRERR");
    // waApi
    //   .getFull("sin(x)")
    //   .then((queryresult) => {
    //     const pods = queryresult.pods;
    //     const output = pods
    //       .map((pod) => {
    //         const subpodContent = pod.subpods
    //           .map(
    //             (subpod) =>
    //               `  <img src="${subpod.img.src}" alt="${subpod.img.alt}">`
    //           )
    //           .join("\n");
    //         return `<h2>${pod.title}</h2>\n${subpodContent}`;
    //       })
    //       .join("\n");
    //     console.log(output);
    //   })
    //   .catch(console.error);
  };

  return (
    <Formik
      initialValues={{
        func: "",
        fromX: 0,
        toX: 1,
      }}
      onSubmit={handleSubmit}
    >
      <Form>
        <InputForm
          className="header__input header__input-func"
          type="text"
          name="func"
          label="Functional expression:"
        />
        <div className="header__parametres">
          <InputForm
            className="header__input header__input-range"
            type="text"
            name="fromX"
            label="from"
          />
          <InputForm
            className="header__input header__input-range"
            type="text"
            name="toX"
            label="to"
          />
        </div>
        <button type="submit" className="btn header__btn">
          build graph
        </button>
      </Form>
    </Formik>
  );
};

export default FunctionForm;
