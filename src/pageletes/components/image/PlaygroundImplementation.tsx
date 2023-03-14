import {
  Checkbox,
  CheckboxGroup,
  Image,
  ImageProps,
  TextInput,
} from "@avaya/neo-react";
import { useMemo, useState } from "react";

import { Playground } from "components";
import { prettyPrintHtml, prettyPrintReact } from "helpers/utils";

const sandbox = "https://codesandbox.io/s/neo-react-image-n7xj2z";
const storybook =
  "https://neo-react-library-storybook.netlify.app/?path=/story/components-image";

const defaultSrc = "https://source.unsplash.com/random/200x300";

export const PlaygroundImplementation = () => {
  const [src, setSrc] = useState<ImageProps["src"]>(defaultSrc);

  const [isBroken, setIsBroken] = useState(false);
  const [isThumbnail, setIsThumbnail] =
    useState<ImageProps["thumbnail"]>(false);

  const react = useMemo(
    () =>
      prettyPrintReact(`
<Image
  src="${isBroken ? "baduri" : src}"
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
    [isBroken, isThumbnail, src]
  );

  const html = useMemo(
    () =>
      prettyPrintHtml(`
  <img
    alt="Random image"
    src="${isBroken ? "baduri" : src}"
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
    [isBroken, isThumbnail, src]
  );

  return (
    <Playground
      options={
        <Playground.OptionsContainer>
          <Playground.OptionsSection title="Image Source">
            <TextInput
              aria-label="Image Source"
              defaultValue={src}
              onChange={(e) => setSrc(e.target.value || defaultSrc)}
            />
          </Playground.OptionsSection>

          <Playground.OptionsSection title="Variables" id="variables">
            <CheckboxGroup
              groupName="Variables"
              aria-labelledby="variables"
              onChange={(e) => {
                const { value } = e.target as HTMLInputElement;
                switch (value) {
                  case "isBroken":
                    setIsBroken(!isBroken);
                    break;
                  case "isThumbnail":
                    setIsThumbnail(!isThumbnail);

                    break;
                }
              }}
            >
              <Checkbox value="isBroken" checked={isBroken}>
                Is Broken URI
              </Checkbox>

              <Checkbox value="isThumbnail" checked={isThumbnail}>
                Is Thumbnail Image
              </Checkbox>
            </CheckboxGroup>
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
        src={isBroken ? "baduri" : src}
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
