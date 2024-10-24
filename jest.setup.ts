import React from "react";
import "jest-canvas-mock";
import { TextEncoder, TextDecoder as NodeTextDecoder } from "util";

global.TextEncoder = TextEncoder;
global.TextDecoder = NodeTextDecoder as typeof TextDecoder;
global.React = React;
global.ResizeObserver = require("resize-observer-polyfill");
