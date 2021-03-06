import React, { useState } from 'react';
import styled from 'styled-components';
import {HeaderText, SubHeaderText} from '../../styles/commonStyles';
import { useTranslationNamespace } from '../../service/translation';

const ResourceHeaderText = styled(HeaderText)`
    color: #686868;
    margin-bottom: 3px;
`;

export default function ResourcesHeader() {
    const [{t}, setT] = useState({t: (s) => s});
    useTranslationNamespace('resourcesHeader', language => import(`./locales/${language}/strings.json`), newT => setT({t: newT}));

    return (
        <>
            <ResourceHeaderText>{t('TITLE')}</ResourceHeaderText>
            <SubHeaderText>{t('SUBTITLE')}</SubHeaderText>
        </>
    );
}
