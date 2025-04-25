import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';
import { useState } from 'react';
import { Header } from '../components/Header';


type Inputs = {
    description: string
    amount: string
    date: Dayjs
    category: string
}

export function AddTransactions() {
    const [amount, setAmount] = useState(0)
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

    return (
        <>
            <Header title='Add transactions page'/>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl>
                    <Controller
                        control={control}
                        name='date'
                        rules={{ required: true }}
                        render={({ field }) => {
                            return (<DatePicker
                                label="Date"
                                value={field.value}
                                inputRef={field.ref}
                                onChange={(date) => {
                                    field.onChange(date);
                                }}
                            />)
                        }}
                    />
                    {errors.date && <span>This field is required</span>}

                    <TextField label='Description' {...register('description', { required: true })} />
                    {errors.description && <span>This field is required</span>}

                    <TextField label='Amount' type='number'  {...register('amount', { required: true })} />
                    {errors.amount && <span>This field is required</span>}

                    <Select defaultValue='' {...register('category', { required: true })}>
                        <MenuItem value='Deposits'>Deposits</MenuItem>
                        <MenuItem value='Recurring'>Recurring</MenuItem>
                        <MenuItem value='Utilities'>Utilities</MenuItem>
                    </Select>
                    {errors.category && <span>This field is required</span>}

                    <Button type="submit">Submit</Button>
                </FormControl>
            </form>
        </>
    )
}