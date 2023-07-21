import { Image, ImageProps, RadioGroup, Radio } from "@avaya/neo-react";
import { useMemo, useState } from "react";

import { Playground } from "components";
import { prettyPrintHtml, prettyPrintReact } from "helpers";

const sandbox = "https://codesandbox.io/s/neo-react-image-n7xj2z";
const storybook =
  "https://neo-react-library-storybook.netlify.app/?path=/story/components-image";

const defaultSrc = "https://source.unsplash.com/random/200x300";

export const PlaygroundImplementation = () => {
  const [isThumbnail, setIsThumbnail] =
    useState<ImageProps["thumbnail"]>(false);

  const react = useMemo(
    () =>
      prettyPrintReact(`
<Image
  src="${defaultSrc}"
  alt="Random image"
  thumbnail={${isThumbnail}}
  fallback="https://via.placeholder.com/200x300"
/>

${
  isThumbnail
    ? `
<p style={{ paddingLeft: '2rem' }}>
  The image displayed is chosen at random from a collection of image
  provided by Lorem Picsum
</p>
`
    : ""
}
  `),
    [isThumbnail],
  );

  const html = useMemo(
    () =>
      prettyPrintHtml(`
  <img
    alt="Random image"
    src="${defaultSrc}"
    class="${isThumbnail ? "neo-thumbnail" : "neo-img neo-img--fluid"}"
  />

  ${
    isThumbnail
      ? `
  <p style="padding-left: 2rem">
    The image displayed is chosen at random from a collection of image
    provided by Lorem Picsum
  </p>
  `
      : ""
  }
  `),
    [isThumbnail],
  );

  return (
    <Playground
      options={
        <Playground.OptionsContainer>
          <Playground.OptionsSection title="Variations">
            <RadioGroup
              groupName="variations"
              selected={isThumbnail ? "thumbnail" : "image"}
              onChange={() => {
                setIsThumbnail(!isThumbnail);
              }}
            >
              <Radio value="image">Image</Radio>
              <Radio value="thumbnail">Thumbnail</Radio>
            </RadioGroup>
          </Playground.OptionsSection>
        </Playground.OptionsContainer>
      }
      examples={{
        html,
        react,
        sandbox,
        storybook,
      }}
    >
      <Image
        src={src}
        alt="Random image"
        thumbnail={isThumbnail}
        fallback="https://via.placeholder.com/200x300"
      />

      {isThumbnail && (
        <p style={{ paddingLeft: "2rem" }}>
          The image displayed is chosen at random from a collection of image
          provided by Lorem Picsum
        </p>
      )}
    </Playground>
  );
};
