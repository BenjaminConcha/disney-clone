/* eslint-disable no-unused-vars */
import styled from "styled-components";
import ImgSlider from "./ImgSlider";
import Viewers from "./Viewers";
import Recommends from "./Recommends";
import NewDisney from "./NewDisney";
import Originals from "./Originals";
import Trending from "./Trending";
import db from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { selectUserName } from "../features/user/userSlice";
import { useEffect, useState } from "react";
import { setMovies } from "../features/movie/movieSlice";

const Home = () => {
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);
  const [recommends, setRecommends] = useState([]);
  const [newDisney, setNewDisney] = useState([]);
  const [originals, setOriginals] = useState([]);
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    const moviesCollection = collection(db, "movies");

    const unsubscribe = onSnapshot(moviesCollection, (snapshot) => {
      const newRecommends = [];
      const newNewDisney = [];
      const newOriginals = [];
      const newTrending = [];
      snapshot.docs.forEach((doc) => {
        switch (doc.data().type) {
          case "recommend":
            newRecommends.push({ id: doc.id, ...doc.data() });
            break;
          case "new":
            newNewDisney.push({ id: doc.id, ...doc.data() });
            break;
          case "original":
            newOriginals.push({ id: doc.id, ...doc.data() });
            break;
          case "trending":
            newTrending.push({ id: doc.id, ...doc.data() });
            break;
        }
      });
      setRecommends(newRecommends);
      setNewDisney(newNewDisney);
      setOriginals(newOriginals);
      setTrending(newTrending);
      dispatch(
        setMovies({
          recommend: newRecommends,
          newDisney: newNewDisney,
          original: newOriginals,
          trending: newTrending,
        })
      );
    });
    return () => unsubscribe();
  }, [dispatch, userName]);

  return (
    <Container>
      <ImgSlider />
      <Viewers />
      <Recommends />
      <NewDisney />
      <Originals />
      <Trending />
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);

  &::after {
    background: url("/images/home-background.png") center center / cover
      no-repeat fixed;
    content: "";
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }
`;

export default Home;
