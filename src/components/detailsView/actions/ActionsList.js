import styled from 'styled-components';
import React from 'react';
import ActionItem from './ActionItem';
import PropTypes from 'prop-types';
import {StyledList} from '../../../styles/commonStyles';

const ActionsStyledList = styled(StyledList)`
  margin-top: 25px;
  list-style: none;
`;

export default function ActionsList({resourceActions}) {
    return (
        <ActionsStyledList>
            {resourceActions.map(({name}, key) => {
                const actionProps = {
                    name
                };
                return <ActionItem key={key} {...actionProps} />;
            })}
        </ActionsStyledList>
    );
}

ActionsList.propTypes = {
    resourceActions: PropTypes.array
};
