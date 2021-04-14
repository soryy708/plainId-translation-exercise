import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import SectionHeader from '../common/SectionHeader';
import {ReadOnlyTextArea, TextField} from '../../fields';
import { getLanguage, useTranslationNamespace } from '../../../service/translation';

const SectionContainer = styled.div`
    width: 60%;
    border-right: 1px solid lightgray;
    padding: 0 12px 5px;
    min-height: 100%;
`;

const FieldsContainer = styled.div`
    margin-top: 6px;
`;

export default function GeneralDetailsSection({resource}) {
    const [, setI18nLoaded] = useState(false);

    const {t} = global;
    const sectionHeaderProps = {
        headerText: t('generalDetails:SECTION_TITLE'),
        subHeaderText: t('generalDetails:SECTION_SUB_TITLE')
    };
    const {name, description, resourceType, path} = resource;
    const nameProps = {
        value: name,
        label: t('generalDetails:SECTION_FIELD_TITLE_NAME')
    };
    const descriptionProps = {
        value: description,
        label: t('generalDetails:SECTION_FIELD_TITLE_DESCRIPTION')
    };
    const resourceTypeProps = {
        value: resourceType,
        label: t('generalDetails:SECTION_FIELD_TITLE_RESOURCE_TYPE')
    };
    const pathProps = {
        value: path,
        label: t('generalDetails:SECTION_FIELD_TITLE_RESOURCE_PATH')
    };

    const language = getLanguage();
    useTranslationNamespace('generalDetails', import(`./locales/${language}/strings.json`), () => setI18nLoaded(true));

    return (
        <SectionContainer>
            <SectionHeader {...sectionHeaderProps} />
            <FieldsContainer>
                <TextField {...nameProps} />
                <ReadOnlyTextArea {...descriptionProps} />
                <TextField {...resourceTypeProps} />
                <TextField {...pathProps} />
            </FieldsContainer>
        </SectionContainer>
    );
}

GeneralDetailsSection.propTypes = {
    resource: PropTypes.object
};
