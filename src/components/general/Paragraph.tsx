import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import slugify from '../../lib/slugify';
import { useWindowWidth } from 'window-dimensions-hooks';

interface StylesProps {
  isOpen: boolean;
  readMore?: boolean;
  staticPage?: boolean;
}

const ParagraphStyles = styled.p<StylesProps>`
  color: ${props => props.theme.pText};
  transition-duration: 0.5s;
  font-size: 1.05rem;
  line-height: 1.5rem;
  ${props =>
    props.readMore
      ? `height: ${!props.isOpen && props.readMore ? '4.2rem' : 'auto'}`
      : 'auto'};
  /* height: ${props =>
    !props.isOpen && props.readMore ? '4.2rem' : 'auto'}; */
  position: relative;
  overflow: hidden;
  padding-bottom: ${props => (props.readMore ? '15px' : '0')};

  ${props =>
    !props.staticPage &&
    css`
      &:after {
        content: '';
        text-align: right;
        position: absolute;
        bottom: 0;
        right: 0;
        width: 70%;
        height: 1.2em;
        background: ${!props.isOpen && props.readMore
          ? `linear-gradient(
      to right,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 1) 50%
    )`
          : 'transparent'};
      }
    `};
`;

const ReadBtn = styled.button<StylesProps>`
  position: absolute;
  z-index: 2;
  bottom: ${props => (props.isOpen ? '0.8rem' : '1.4rem')};
  right: 18px;
  border: none;
  text-decoration: underline;
  background-color: transparent;

  &:hover {
    cursor: pointer;
  }
`;

interface ReadMoreLessBtnProps {
  isOpen: boolean;
  toggleIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ReadMoreLessBtn = ({
  isOpen,
  toggleIsOpen,
}: ReadMoreLessBtnProps): JSX.Element => {
  return (
    <ReadBtn isOpen={isOpen} onClick={() => toggleIsOpen(!isOpen)}>
      read {isOpen ? 'less' : 'more'}
    </ReadBtn>
  );
};

interface PropTypes {
  content: string;
  readmore?: boolean;
  staticPage?: boolean;
}

const Paragraph = ({
  content,
  readmore,
  staticPage,
}: PropTypes): JSX.Element => {
  const [isOpen, toggleIsOpen] = useState<boolean>(false);
  const [elHeight, setElHeight] = useState<number>(0);
  const width = useWindowWidth();

  // creates unique id for each paragraph to measure div.clientHeight
  const elId = `paragraph-${slugify(content.slice(10, 14))}`;

  useEffect(() => {
    setElHeight(document.getElementById(elId).clientHeight);
  }, [elId]);

  // if desktop on static pages, show whole content w/o 'read more' button
  if (staticPage && width >= 768) {
    return (
      <div id={elId}>
        <ParagraphStyles isOpen={true} readMore={false} staticPage>
          {content}
        </ParagraphStyles>
      </div>
    );
  }

  return (
    <div id={elId}>
      <ParagraphStyles
        isOpen={isOpen}
        readMore={readmore === false ? false : elHeight > 76}
      >
        {content}
      </ParagraphStyles>
      {readmore === false
        ? null
        : elHeight > 76 && (
            <ReadMoreLessBtn isOpen={isOpen} toggleIsOpen={toggleIsOpen} />
          )}
    </div>
  );
};

export default Paragraph;
