import { createContext, useEffect, useState } from "react";
export const ContextData = createContext();
import axios from "axios";

const initState = {
  isDataLoad: false,
  isMainContainer: "sections",
  dataListSections: [],
  dataListReporters: [],
};

const AppContext = ({ children }) => {
  const [state, setState] = useState(initState);

  const [dataSections, setSections] = useState({
    done: false,
    isGet: false,
    data: [],
  });

  const [dataReporters, setReporters] = useState({
    done: false,
    isGet: false,
    data: [],
  });

  useEffect(() => {
    axios
      .get(
        "https://storage.googleapis.com/vrw-dataset/get_headers_raspi_sections_update.json"
      )
      .then((response) => {
        setSections({
          done: true,
          isGet: true,
          data: response.data,
        });
      })
      .catch((error) => {
        console.error("Error", error);
        setSections({
          done: true,
          isGet: false,
          data: [],
        });
      });

    axios
      .get(
        "https://storage.googleapis.com/vrw-dataset/get_headers_raspi_reporters_update.json"
      )
      .then((response) => {
        setReporters({
          done: true,
          isGet: true,
          data: response.data,
        });
      })
      .catch((error) => {
        console.error("Error", error);
        setReporters({
          done: true,
          isGet: false,
          data: [],
        });
      });
  }, []);

  useEffect(() => {
    if (dataSections.done === true && dataReporters.done === true) {
      setState({
        ...state,
        isDataLoad: true,
        dataListSections: dataSections.data,
        dataListReporters: dataReporters.data,
      });
    }
  }, [dataSections, dataReporters]);

  return (
    <ContextData.Provider value={[state, setState]}>
      {children}
    </ContextData.Provider>
  );
};

export default AppContext;
