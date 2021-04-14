import React, { useState } from 'react';
import styled from 'styled-components';
import {HeaderText, SubHeaderText} from '../../styles/commonStyles';
import { getLanguage, useTranslationNamespace } from '../../service/translation';

const ResourceHeaderText = styled(HeaderText)`
    color: #686868;
    margin-bottom: 3px;
`;

export default function ResourcesHeader() {
    const [, setI18nLoaded] = useState(false);

    const {t} = global;

    const language = getLanguage();
    useTranslationNamespace('resourcesHeader', import(`./locales/${language}/strings.json`), () => setI18nLoaded(true));

    return (
        <>
            <ResourceHeaderText>{t('resourcesHeader:TITLE')}</ResourceHeaderText>
            <SubHeaderText>{t('resourcesHeader:SUBTITLE')}</SubHeaderText>
        </>
    );
}
