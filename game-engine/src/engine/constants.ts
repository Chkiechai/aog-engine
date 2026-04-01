export { ENGINE_VERSION, ENGINE_NAME } from './index';
// Wait, that would be circular! Instead, move the version/name here
// or create a barrel export. We will clean this up in the next session.

/**
 * Engine-wide constant values.
 * These define the fundamental parameters of the game engine.
 */

/** Width of the game screen in characters */
export const SCREEN_WIDTH = 80;

/** Height of the game screen in characters */
export const SCREEN_HEIGHT = 24;

/** Target frames per second for the game loop */
export const TARGET_FPS = 15;

/** The title displayed in the game window */
export const GAME_TITLE = "Assassins of Glass: The Game";

/** Maximum number of entities the engine supports */
export const MAX_ENTITIES = 1000;

/** The character used to draw empty space */
export const EMPTY_CHAR = ".";

/** The character used to draw borders */
export const BORDER_CHAR = "#";
