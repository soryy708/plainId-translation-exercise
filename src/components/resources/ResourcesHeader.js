import React from 'react';
import styled from 'styled-components';
import {HeaderText, SubHeaderText} from '../../styles/commonStyles';
import { getLocalizer, useTranslationNamespace } from '../../service/translation';

const ResourceHeaderText = styled(HeaderText)`
    color: #686868;
    margin-bottom: 3px;
`;

export default function ResourcesHeader() {
    const t = getLocalizer();

    useTranslationNamespace('resourcesHeader', language => import(`./locales/${language}/strings.json`));

    return (
        <>
            <ResourceHeaderText>{t('TITLE')}</ResourceHeaderText>
            <SubHeaderText>{t('SUBTITLE')}</SubHeaderText>
        </>
    );
}
