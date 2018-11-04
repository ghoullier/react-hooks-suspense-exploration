import React, { useCallback } from "react";
import { useSpring, animated } from "react-spring";
import { navigate } from "@reach/router";

import { Image } from "./Image";

import { usePress } from "../Hooks/usePress";

import { ITEM_WIDTH, ITEM_HEIGHT, ITEM_BORDER_RADIUS } from "../Config";
import { absoluteFill } from "../Styles";
import { human, uiKit } from "../Typography";
import { colors } from "../Colors";

const MovieCell = React.memo(props => {
  const { id, title, posterUrl, placeholderPosterUrl, releaseYear } = props;
  const targetUrl = `/movies/${id}`;

  const pressHandler = useCallback(() => {
    navigate(targetUrl, {
      state: {
        ...props,
      },
    });
  }, []);

  const [pressRef, isPressed] = usePress("link", pressHandler, true);

  const [pressStyleProps] = useSpring({
    transform: `scale(${isPressed ? 0.95 : 1.0})`,
    config: { tension: 500, friction: 30 },
    native: true,
  });

  return (
    <div
      style={{
        flex: 1,
        maxWidth: ITEM_WIDTH,
        height: ITEM_HEIGHT - 60,
        marginLeft: 30,
        marginRight: 30,
        willChange: "transform",
        cursor: "pointer",
      }}
    >
      <div
        style={{
          ...absoluteFill,
          borderRadius: ITEM_BORDER_RADIUS,
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          transform: "translateY(10px)",
          filter: "blur(20px)",
        }}
      />
      <animated.a
        ref={pressRef}
        title={title}
        href={targetUrl}
        style={{
          ...absoluteFill,
          overflow: "hidden",
          backgroundColor: "white",
          borderRadius: ITEM_BORDER_RADIUS,
          willChange: "transform",
          ...pressStyleProps,
        }}
      >
        <Image
          alt=""
          style={absoluteFill}
          src={posterUrl}
          placholderSrc={placeholderPosterUrl}
        />
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "white",
            padding: 15,
            willChange: "transform",
          }}
        >
          <h1 style={{ ...human.title1, fontWeight: "bold" }}>{title}</h1>
          <h2 style={{ ...uiKit.subhead, color: colors.gray }}>
            {releaseYear}
          </h2>
        </div>
      </animated.a>
    </div>
  );
});

export { MovieCell };