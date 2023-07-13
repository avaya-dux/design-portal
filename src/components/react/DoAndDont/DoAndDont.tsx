import { Icon } from "@avaya/neo-react";
import clsx from "clsx";

import "./DoAndDont.css";

export interface InstructionProps {
  children: React.ReactNode;
  instructions: string;
}

export interface DoAndDontProps {
  children: React.ReactElement<InstructionProps>[];
  size?: "normal" | "no-ratio" | "wide";
}

/**
 * The `DoAndDont` component is used to display a component's dos and don'ts.
 *
 * @example
 * <DoAndDont>
    <DoAndDont.DoContainer instructions={colorDoInstructions}>
      <Image src={TextLabel2Do} alt={colorDoImgAltText} />
    </DoAndDont.DoContainer>

    <DoAndDont.DontContainer instructions={colorDontInstructions}>
      <Image src={TextLabel2Dont} alt={colorDontImgAltText} />
    </DoAndDont.DontContainer>
  </DoAndDont>
 *
 * @example
 * <DoAndDont size="wide">
    <DoAndDont.DoContainer instructions={doInstructions}>
      <ImageExampleContainer>
        <Image src={ArrangementDo} alt={doImgAltText} />
      </ImageExampleContainer>
    </DoAndDont.DoContainer>

    <DoAndDont.DontContainer instructions={dontInstructions}>
      <ImageExampleContainer>
        <Image src={ArrangementDont} alt={dontImgAltText} />
      </ImageExampleContainer>
    </DoAndDont.DontContainer>
  </DoAndDont>
 *
 * @see `DoAndDont/DoAndDont.stories.tsx` for more details and examples.
 */
export const DoAndDont = ({ children, size = "no-ratio" }: DoAndDontProps) => (
  <div
    className={clsx(
      "do-and-dont-container",
      size === "wide" && "do-and-dont-container-wide",
      size == "no-ratio" && "do-and-dont-container-no-ratio",
    )}
  >
    {children}
  </div>
);

const DoContainer = ({ children, instructions }: InstructionProps) => (
  <div className="do-and-dont-example-item">
    <div className="do-and-dont-example-content do-and-dont-example-content-do">
      <Icon
        aria-label="check mark icon"
        className="do-and-dont-check-mark"
        icon="available-filled"
        size="lg"
      />

      {children}
    </div>

    <p className="do-and-dont-paragraph">
      <b>DO:</b> {instructions}
    </p>
  </div>
);

const DontContainer = ({ children, instructions }: InstructionProps) => (
  <div className="do-and-dont-example-item">
    <div className="do-and-dont-example-content do-and-dont-example-content-dont">
      <Icon
        className="do-and-dont-missed-filled"
        icon="missed-filled"
        aria-label="error icon"
        size="lg"
      />

      {children}
    </div>

    <p className="do-and-dont-paragraph">
      <b>DON'T:</b> {instructions}
    </p>
  </div>
);

const ImageExampleContainer = ({ children }: { children: React.ReactNode }) => (
  <div className="do-and-dont-example-content-image">{children}</div>
);

DoAndDont.DoContainer = DoContainer;
DoAndDont.DontContainer = DontContainer;
DoAndDont.ImageExampleContainer = ImageExampleContainer;
