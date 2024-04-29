﻿import React, { useEffect, useState } from 'react';
import { RankSelect } from 'src/shared-components/rank-select';
import { Rank } from 'src/models/enums';
import { FormControlLabel, Switch } from '@mui/material';
import { AccessibleTooltip } from 'src/v2/components/tooltip';
import { Info } from '@mui/icons-material';

interface Props {
    allowedValues: Rank[];
    rank?: Rank;
    point5: boolean;
    onChange: (value: Rank, point5: boolean) => void;
}

export const RankGoalSelect: React.FC<Props> = ({ allowedValues, rank, onChange, point5 }) => {
    const [form, setForm] = useState({
        rank: rank && allowedValues.includes(rank) ? rank! : allowedValues[0],
        point5,
    });

    useEffect(() => {
        setForm(curr => ({
            ...curr,
            rank: rank && allowedValues.includes(rank) ? rank! : allowedValues[0],
        }));
    }, [allowedValues]);

    const handleRankChange = (value: number) => {
        onChange(value, form.point5);
        setForm(curr => ({ ...curr, rank: value }));
    };

    const handlePoint5Change = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(form.rank, event.target.checked);
        setForm(curr => ({ ...curr, point5: event.target.checked }));
    };

    return (
        <div className="flex-box gap10 full-width">
            <RankSelect
                label={'Target Rank'}
                rankValues={allowedValues}
                value={form.rank}
                valueChanges={handleRankChange}
            />
            <div className="flex-box">
                <FormControlLabel
                    label="Point Five"
                    control={
                        <Switch
                            checked={form.point5}
                            onChange={handlePoint5Change}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />
                    }
                />
                <AccessibleTooltip
                    title={
                        'When you reach a target upgrade rank, you are immediately able to apply the top row of three upgrades.\r\nIf you toggle on this switch then these upgrades will be included in your daily raids plan.'
                    }>
                    <Info color="primary" />
                </AccessibleTooltip>
            </div>
        </div>
    );
};
