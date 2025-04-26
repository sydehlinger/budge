import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Button, FormControl, MenuItem, Select, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { Header } from '../components/Header';
import { Transaction } from '../types/Transaction';
import { AppDispatch } from '../../main';
import { useDispatch } from 'react-redux';
import { transactionAdded } from '../redux/slices/transactionsSlice';

export function AddTransactions() {
    const dispatch = useDispatch<AppDispatch>();

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<Transaction>()

    const onSubmit: SubmitHandler<Transaction> = (data) => {
        console.log(data)
        dispatch(transactionAdded(data))
    }

    return (
        <>
            <Header title='Add transactions page' />
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl>
                    <Controller
                        control={control}
                        name='date'
                        rules={{ required: true }}
                        render={({ field }) => {
                            return (<DatePicker
                                label="Date"
                                defaultValue={field.value}
                                inputRef={field.ref}
                                onChange={(date) => {
                                    field.onChange(date?.format('MM/DD/YYYY'));
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