import styled from "styled-components";

export const CellStyle = styled.button`
  background-color: #f9f8eb;
  color: #f9f8eb;
  font-size: 3rem;
  border: none;
  width: 10rem;
  height: 10rem;
  border-radius: 2.5rem;
  box-shadow: 5px 10px #006A6A;
  cursor: pointer;
  padding: 3rem;

  .markedItem {
      path {
        fill: #006A6A;
      }
  }
  .outlineIcon {
    path {
      stroke: #006A6A;
      stroke-width: 0;
    }
  }

  &:hover {
    .outlineIcon {
      path {
        stroke-width: 2;
      }
    }
  }
`;