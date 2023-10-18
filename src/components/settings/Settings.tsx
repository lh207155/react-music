import React, { useRef, useState } from "react";
import { Box, Card, Slider } from "@mui/material";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
// import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import { useDispatch, useSelector } from "../../redux/hooks";
import { playControllerSlice } from "../../redux/playController/slice";

const Settings = () => {
  const [volumeActive, setVolumeActive] = useState(false);
  const dispatch = useDispatch();
  const volume = useSelector((state) => state.playController.volume);
  const handleClick = () => {
    dispatch(playControllerSlice.actions.switchPlayList());
  };
  const handleSlide = (value: number) => {
    dispatch(playControllerSlice.actions.slideVolume(value));
  };

  return (
    <Box
      sx={{
        width: "25%",
        display: "flex",
        justifyContent: "flex-end",
        paddingRight: "15px",
        height: "85px",
      }}
    >
      <div
        onMouseEnter={() => {
          console.log("jinlaile");
          setVolumeActive(true);
        }}
        onMouseLeave={() => setVolumeActive(false)}
      >
        <Box sx={{ position: "relative" }}>
          <div>
            <Box
              sx={{
                position: "absolute",
                bottom: "60px",
                width: "50px",
                height: "200px",
                backgroundColor: "rgba(255,255,255)",
                left: "-20px",
                borderRadius: "10px",
                boxShadow: "5px 5px 10px 0px rgba(0, 0, 0, 0.5)",
                padding: "15px 0",
                boxSizing: "border-box",
                textAlign: "center",
                display: volumeActive ? "block" : "none",
              }}
            >
              <Slider
                value={typeof volume === "number" ? volume : 0}
                onChange={(_, value) => handleSlide(value as number)}
                aria-labelledby="input-slider"
                orientation="vertical"
                max={1}
                min={0}
                step={0.1}
                sx={{ color: "#E055B1" }}
              />
            </Box>
          </div>

          <div>
            <VolumeUpIcon
              sx={{
                height: "85px",
                color: "rgb(50,50,50)",
                fontSize: "30px",
                cursor: "pointer",
                ":hover": {
                  color: "#E055B1",
                },
              }}
            />
          </div>
        </Box>
      </div>

      <PlaylistPlayIcon
        sx={{
          color: "rgb(50,50,50)",
          height: "85px",
          marginLeft: "30px",
          marginRight: "30px",
          fontSize: "30px",
          cursor: "pointer",
          ":hover": {
            color: "#E055B1",
          },
        }}
        onClick={handleClick}
      />
    </Box>
  );
};

export default Settings;
