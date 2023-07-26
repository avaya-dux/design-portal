import {
  BasicModal,
  InfoModal,
  Radio,
  RadioGroup,
  Switch,
} from "@avaya/neo-react";
import { useMemo, useState, type ReactNode } from "react";

import { Playground } from "components";
import { prettyPrintHtml, prettyPrintReactElementToString } from "helpers";

import { clsx } from "clsx";

export const sandbox = "https://codesandbox.io/s/neo-react-list-hvxfzq";
export const storybook =
  "https://neo-react-library-storybook.netlify.app/?path=/docs/introduction--docs";

type ModalExampleType = "basic" | "info";

export const PlaygroundImplementation = () => {
  const [modalType, setModalType] = useState<ModalExampleType>("basic");

  const [showModal, setShowModal] = useState(true);

  const [component, react, html] = useMemo(() => {
    let element: ReactNode = <p>Loading...</p>;

    const title = "Header of Modal";

    if (modalType === "basic") {
      element = (
        <BasicModal
          open={showModal}
          title={title}
          onClose={() => setShowModal(false)}
        >
          <p>Sample text content.</p>
        </BasicModal>
      );
    } else {
      element = (
        <InfoModal
          open={showModal}
          title={title}
          onClose={() => setShowModal(false)}
        >
          <p>Sample text content.</p>
        </InfoModal>
      );
    }

    const htmlModal = `
    <div id="neo-modal-example" ${clsx(
      showModal && "class='neo-modal-active'",
    )}>
    <div class="neo-modal__background"></div>
    <div class="neo-modal__content" aria-modal="true" role="dialog">
    ${clsx(
      modalType === "info" &&
        '<div class="neo-modal__info-close"><button class="neo-close /></div>',
    )}
      <div class="neo-modal__header">
        <h4>Header of Modal window</h4>
      </div>
      <div class="neo-modal__body">
        <p class="neo-modal__message">
        Sample text content.
        </p>
      </div>
    ${clsx(
      modalType === "basic" &&
        '<div class="neo-modal__footer"><button class="neo-btn neo-btn-secondary neo-btn-secondary--primary">Close</button></div>',
    )}
    </div>
  </div>
    `;

    return [
      element,
      prettyPrintReactElementToString(element),
      prettyPrintHtml(htmlModal),
    ];
  }, [modalType, showModal]);

  return (
    <div>
      <Playground
        options={
          <Playground.OptionsContainer>
            <Playground.OptionsSection title="Show/Hide Modal">
              <Switch
                onChange={() => setShowModal(!showModal)}
                checked={showModal}
              >
                Show/Hide
              </Switch>
            </Playground.OptionsSection>

            <Playground.OptionsSection title="Type">
              <RadioGroup
                groupName="modal-type"
                selected={modalType}
                onChange={(e: { target: { value: string } }) => {
                  setModalType(e.target.value as ModalExampleType);
                }}
              >
                <Radio value="basic">Basic</Radio>
                <Radio value="informational">Informational</Radio>
              </RadioGroup>
            </Playground.OptionsSection>
          </Playground.OptionsContainer>
        }
        examples={{
          react,
          html,
          sandbox,
          storybook,
        }}
      >
        {component}
      </Playground>
    </div>
  );
};
