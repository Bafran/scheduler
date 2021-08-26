import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Company = {
  __typename?: 'Company';
  id: Scalars['ID'];
  companyName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  employees: Array<Employee>;
};

export type CompanyRegisterCreds = {
  companyName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};


export type Department = {
  __typename?: 'Department';
  id: Scalars['ID'];
  name: Scalars['String'];
  companyId: Scalars['Int'];
  managers?: Maybe<Array<Employee>>;
  employees?: Maybe<Array<Employee>>;
};

export type Employee = {
  __typename?: 'Employee';
  id: Scalars['ID'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  payRate?: Maybe<Scalars['Float']>;
  companyId?: Maybe<Scalars['ID']>;
  company?: Maybe<Scalars['ID']>;
  title?: Maybe<Scalars['String']>;
  departmentId?: Maybe<Scalars['ID']>;
  shifts: Array<Shift>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  register: UserResponse;
  login: Scalars['Boolean'];
  logout: Scalars['Boolean'];
  giveTitle: UserResponse;
  setDepartmentId: UserResponse;
  addShift: Scalars['Boolean'];
  registerCompany: Company;
  companyLogin: Scalars['Boolean'];
  insertEmployee: Scalars['Boolean'];
  addManager: Scalars['Boolean'];
  createDepartment: Scalars['Boolean'];
};


export type MutationRegisterArgs = {
  options: RegisterCreds;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationGiveTitleArgs = {
  findBy: Scalars['String'];
  argument: Scalars['String'];
  title: Scalars['String'];
};


export type MutationSetDepartmentIdArgs = {
  employeeId: Scalars['Int'];
  id: Scalars['Int'];
};


export type MutationAddShiftArgs = {
  isHoliday: Scalars['Boolean'];
  length: Scalars['Float'];
  dateTime: Scalars['String'];
  departmentId: Scalars['Int'];
  employeeId: Scalars['Int'];
};


export type MutationRegisterCompanyArgs = {
  options: CompanyRegisterCreds;
};


export type MutationCompanyLoginArgs = {
  password: Scalars['String'];
  companyName: Scalars['String'];
};


export type MutationInsertEmployeeArgs = {
  employeeId: Scalars['Float'];
};


export type MutationAddManagerArgs = {
  employeeId: Scalars['Int'];
};


export type MutationCreateDepartmentArgs = {
  departmentName: Scalars['String'];
  companyId: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<Employee>;
  findEmployee?: Maybe<Employee>;
  employees: Array<Employee>;
  getShifts: Array<Employee>;
  scheduledShifts: Array<Shift>;
  fetchAllCompanies: Array<Company>;
  meCompany?: Maybe<Company>;
  fetchCompanyEmployees: Array<Employee>;
  getCompanyDepartments: Array<Department>;
};


export type QueryFindEmployeeArgs = {
  findBy: Scalars['String'];
  argument: Scalars['String'];
};


export type QueryGetShiftsArgs = {
  dateTime: Scalars['String'];
  id: Scalars['Int'];
};


export type QueryScheduledShiftsArgs = {
  dateTime: Scalars['String'];
  id: Scalars['Int'];
};


export type QueryFetchCompanyEmployeesArgs = {
  companyId: Scalars['Int'];
};


export type QueryGetCompanyDepartmentsArgs = {
  companyId: Scalars['Int'];
};

export type RegisterCreds = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Shift = {
  __typename?: 'Shift';
  id: Scalars['ID'];
  departmentId?: Maybe<Scalars['ID']>;
  employeeId: Scalars['ID'];
  employee: Employee;
  startTime: Scalars['DateTime'];
  endTime: Scalars['DateTime'];
  isHoliday: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  employee?: Maybe<Employee>;
};

export type CompanyLoginMutationVariables = Exact<{
  companyName: Scalars['String'];
  password: Scalars['String'];
}>;


export type CompanyLoginMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'companyLogin'>
);

export type CreateDepartmentMutationVariables = Exact<{
  departmentName: Scalars['String'];
  companyId: Scalars['Int'];
}>;


export type CreateDepartmentMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createDepartment'>
);

export type GiveTitleMutationVariables = Exact<{
  argument: Scalars['String'];
  title: Scalars['String'];
  findBy: Scalars['String'];
}>;


export type GiveTitleMutation = (
  { __typename?: 'Mutation' }
  & { giveTitle: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'login'>
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterCompanyMutationVariables = Exact<{
  options: CompanyRegisterCreds;
}>;


export type RegisterCompanyMutation = (
  { __typename?: 'Mutation' }
  & { registerCompany: (
    { __typename?: 'Company' }
    & Pick<Company, 'id' | 'companyName'>
  ) }
);

export type RegisterEmployeeMutationVariables = Exact<{
  options: RegisterCreds;
}>;


export type RegisterEmployeeMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type FindEmployeeQueryVariables = Exact<{
  argument: Scalars['String'];
  findBy: Scalars['String'];
}>;


export type FindEmployeeQuery = (
  { __typename?: 'Query' }
  & { findEmployee?: Maybe<(
    { __typename?: 'Employee' }
    & Pick<Employee, 'id' | 'firstName' | 'lastName'>
  )> }
);

export type GetCompanyDepartmentsQueryVariables = Exact<{
  companyId: Scalars['Int'];
}>;


export type GetCompanyDepartmentsQuery = (
  { __typename?: 'Query' }
  & { getCompanyDepartments: Array<(
    { __typename?: 'Department' }
    & Pick<Department, 'id' | 'name'>
  )> }
);

export type GetShiftsQueryVariables = Exact<{
  id: Scalars['Int'];
  dateTime: Scalars['String'];
}>;


export type GetShiftsQuery = (
  { __typename?: 'Query' }
  & { getShifts: Array<(
    { __typename?: 'Employee' }
    & Pick<Employee, 'firstName' | 'lastName'>
    & { shifts: Array<(
      { __typename?: 'Shift' }
      & Pick<Shift, 'id' | 'startTime' | 'endTime'>
    )> }
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'Employee' }
    & Pick<Employee, 'id' | 'firstName' | 'lastName' | 'email' | 'departmentId'>
  )> }
);

export type MeCompanyQueryVariables = Exact<{ [key: string]: never; }>;


export type MeCompanyQuery = (
  { __typename?: 'Query' }
  & { meCompany?: Maybe<(
    { __typename?: 'Company' }
    & Pick<Company, 'id' | 'companyName' | 'email'>
  )> }
);

export type ShiftsQueryVariables = Exact<{
  id: Scalars['Int'];
  dateTime: Scalars['String'];
}>;


export type ShiftsQuery = (
  { __typename?: 'Query' }
  & { scheduledShifts: Array<(
    { __typename?: 'Shift' }
    & Pick<Shift, 'employeeId' | 'startTime' | 'endTime'>
    & { employee: (
      { __typename?: 'Employee' }
      & Pick<Employee, 'firstName' | 'lastName'>
    ) }
  )> }
);


export const CompanyLoginDocument = gql`
    mutation CompanyLogin($companyName: String!, $password: String!) {
  companyLogin(companyName: $companyName, password: $password)
}
    `;
export type CompanyLoginMutationFn = Apollo.MutationFunction<CompanyLoginMutation, CompanyLoginMutationVariables>;

/**
 * __useCompanyLoginMutation__
 *
 * To run a mutation, you first call `useCompanyLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCompanyLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [companyLoginMutation, { data, loading, error }] = useCompanyLoginMutation({
 *   variables: {
 *      companyName: // value for 'companyName'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useCompanyLoginMutation(baseOptions?: Apollo.MutationHookOptions<CompanyLoginMutation, CompanyLoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CompanyLoginMutation, CompanyLoginMutationVariables>(CompanyLoginDocument, options);
      }
export type CompanyLoginMutationHookResult = ReturnType<typeof useCompanyLoginMutation>;
export type CompanyLoginMutationResult = Apollo.MutationResult<CompanyLoginMutation>;
export type CompanyLoginMutationOptions = Apollo.BaseMutationOptions<CompanyLoginMutation, CompanyLoginMutationVariables>;
export const CreateDepartmentDocument = gql`
    mutation CreateDepartment($departmentName: String!, $companyId: Int!) {
  createDepartment(departmentName: $departmentName, companyId: $companyId)
}
    `;
export type CreateDepartmentMutationFn = Apollo.MutationFunction<CreateDepartmentMutation, CreateDepartmentMutationVariables>;

/**
 * __useCreateDepartmentMutation__
 *
 * To run a mutation, you first call `useCreateDepartmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDepartmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDepartmentMutation, { data, loading, error }] = useCreateDepartmentMutation({
 *   variables: {
 *      departmentName: // value for 'departmentName'
 *      companyId: // value for 'companyId'
 *   },
 * });
 */
export function useCreateDepartmentMutation(baseOptions?: Apollo.MutationHookOptions<CreateDepartmentMutation, CreateDepartmentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateDepartmentMutation, CreateDepartmentMutationVariables>(CreateDepartmentDocument, options);
      }
export type CreateDepartmentMutationHookResult = ReturnType<typeof useCreateDepartmentMutation>;
export type CreateDepartmentMutationResult = Apollo.MutationResult<CreateDepartmentMutation>;
export type CreateDepartmentMutationOptions = Apollo.BaseMutationOptions<CreateDepartmentMutation, CreateDepartmentMutationVariables>;
export const GiveTitleDocument = gql`
    mutation GiveTitle($argument: String!, $title: String!, $findBy: String!) {
  giveTitle(argument: $argument, title: $title, findBy: $findBy) {
    errors {
      field
      message
    }
  }
}
    `;
export type GiveTitleMutationFn = Apollo.MutationFunction<GiveTitleMutation, GiveTitleMutationVariables>;

/**
 * __useGiveTitleMutation__
 *
 * To run a mutation, you first call `useGiveTitleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGiveTitleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [giveTitleMutation, { data, loading, error }] = useGiveTitleMutation({
 *   variables: {
 *      argument: // value for 'argument'
 *      title: // value for 'title'
 *      findBy: // value for 'findBy'
 *   },
 * });
 */
export function useGiveTitleMutation(baseOptions?: Apollo.MutationHookOptions<GiveTitleMutation, GiveTitleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GiveTitleMutation, GiveTitleMutationVariables>(GiveTitleDocument, options);
      }
export type GiveTitleMutationHookResult = ReturnType<typeof useGiveTitleMutation>;
export type GiveTitleMutationResult = Apollo.MutationResult<GiveTitleMutation>;
export type GiveTitleMutationOptions = Apollo.BaseMutationOptions<GiveTitleMutation, GiveTitleMutationVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password)
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterCompanyDocument = gql`
    mutation RegisterCompany($options: CompanyRegisterCreds!) {
  registerCompany(options: $options) {
    id
    companyName
  }
}
    `;
export type RegisterCompanyMutationFn = Apollo.MutationFunction<RegisterCompanyMutation, RegisterCompanyMutationVariables>;

/**
 * __useRegisterCompanyMutation__
 *
 * To run a mutation, you first call `useRegisterCompanyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterCompanyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerCompanyMutation, { data, loading, error }] = useRegisterCompanyMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useRegisterCompanyMutation(baseOptions?: Apollo.MutationHookOptions<RegisterCompanyMutation, RegisterCompanyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterCompanyMutation, RegisterCompanyMutationVariables>(RegisterCompanyDocument, options);
      }
export type RegisterCompanyMutationHookResult = ReturnType<typeof useRegisterCompanyMutation>;
export type RegisterCompanyMutationResult = Apollo.MutationResult<RegisterCompanyMutation>;
export type RegisterCompanyMutationOptions = Apollo.BaseMutationOptions<RegisterCompanyMutation, RegisterCompanyMutationVariables>;
export const RegisterEmployeeDocument = gql`
    mutation RegisterEmployee($options: RegisterCreds!) {
  register(options: $options) {
    errors {
      field
      message
    }
  }
}
    `;
export type RegisterEmployeeMutationFn = Apollo.MutationFunction<RegisterEmployeeMutation, RegisterEmployeeMutationVariables>;

/**
 * __useRegisterEmployeeMutation__
 *
 * To run a mutation, you first call `useRegisterEmployeeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterEmployeeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerEmployeeMutation, { data, loading, error }] = useRegisterEmployeeMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useRegisterEmployeeMutation(baseOptions?: Apollo.MutationHookOptions<RegisterEmployeeMutation, RegisterEmployeeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterEmployeeMutation, RegisterEmployeeMutationVariables>(RegisterEmployeeDocument, options);
      }
export type RegisterEmployeeMutationHookResult = ReturnType<typeof useRegisterEmployeeMutation>;
export type RegisterEmployeeMutationResult = Apollo.MutationResult<RegisterEmployeeMutation>;
export type RegisterEmployeeMutationOptions = Apollo.BaseMutationOptions<RegisterEmployeeMutation, RegisterEmployeeMutationVariables>;
export const FindEmployeeDocument = gql`
    query FindEmployee($argument: String!, $findBy: String!) {
  findEmployee(argument: $argument, findBy: $findBy) {
    id
    firstName
    lastName
  }
}
    `;

/**
 * __useFindEmployeeQuery__
 *
 * To run a query within a React component, call `useFindEmployeeQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindEmployeeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindEmployeeQuery({
 *   variables: {
 *      argument: // value for 'argument'
 *      findBy: // value for 'findBy'
 *   },
 * });
 */
export function useFindEmployeeQuery(baseOptions: Apollo.QueryHookOptions<FindEmployeeQuery, FindEmployeeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindEmployeeQuery, FindEmployeeQueryVariables>(FindEmployeeDocument, options);
      }
export function useFindEmployeeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindEmployeeQuery, FindEmployeeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindEmployeeQuery, FindEmployeeQueryVariables>(FindEmployeeDocument, options);
        }
export type FindEmployeeQueryHookResult = ReturnType<typeof useFindEmployeeQuery>;
export type FindEmployeeLazyQueryHookResult = ReturnType<typeof useFindEmployeeLazyQuery>;
export type FindEmployeeQueryResult = Apollo.QueryResult<FindEmployeeQuery, FindEmployeeQueryVariables>;
export const GetCompanyDepartmentsDocument = gql`
    query GetCompanyDepartments($companyId: Int!) {
  getCompanyDepartments(companyId: $companyId) {
    id
    name
  }
}
    `;

/**
 * __useGetCompanyDepartmentsQuery__
 *
 * To run a query within a React component, call `useGetCompanyDepartmentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCompanyDepartmentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCompanyDepartmentsQuery({
 *   variables: {
 *      companyId: // value for 'companyId'
 *   },
 * });
 */
export function useGetCompanyDepartmentsQuery(baseOptions: Apollo.QueryHookOptions<GetCompanyDepartmentsQuery, GetCompanyDepartmentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCompanyDepartmentsQuery, GetCompanyDepartmentsQueryVariables>(GetCompanyDepartmentsDocument, options);
      }
export function useGetCompanyDepartmentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCompanyDepartmentsQuery, GetCompanyDepartmentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCompanyDepartmentsQuery, GetCompanyDepartmentsQueryVariables>(GetCompanyDepartmentsDocument, options);
        }
export type GetCompanyDepartmentsQueryHookResult = ReturnType<typeof useGetCompanyDepartmentsQuery>;
export type GetCompanyDepartmentsLazyQueryHookResult = ReturnType<typeof useGetCompanyDepartmentsLazyQuery>;
export type GetCompanyDepartmentsQueryResult = Apollo.QueryResult<GetCompanyDepartmentsQuery, GetCompanyDepartmentsQueryVariables>;
export const GetShiftsDocument = gql`
    query getShifts($id: Int!, $dateTime: String!) {
  getShifts(id: $id, dateTime: $dateTime) {
    firstName
    lastName
    shifts {
      id
      startTime
      endTime
    }
  }
}
    `;

/**
 * __useGetShiftsQuery__
 *
 * To run a query within a React component, call `useGetShiftsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetShiftsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetShiftsQuery({
 *   variables: {
 *      id: // value for 'id'
 *      dateTime: // value for 'dateTime'
 *   },
 * });
 */
export function useGetShiftsQuery(baseOptions: Apollo.QueryHookOptions<GetShiftsQuery, GetShiftsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetShiftsQuery, GetShiftsQueryVariables>(GetShiftsDocument, options);
      }
export function useGetShiftsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetShiftsQuery, GetShiftsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetShiftsQuery, GetShiftsQueryVariables>(GetShiftsDocument, options);
        }
export type GetShiftsQueryHookResult = ReturnType<typeof useGetShiftsQuery>;
export type GetShiftsLazyQueryHookResult = ReturnType<typeof useGetShiftsLazyQuery>;
export type GetShiftsQueryResult = Apollo.QueryResult<GetShiftsQuery, GetShiftsQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    firstName
    lastName
    email
    departmentId
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const MeCompanyDocument = gql`
    query MeCompany {
  meCompany {
    id
    companyName
    email
  }
}
    `;

/**
 * __useMeCompanyQuery__
 *
 * To run a query within a React component, call `useMeCompanyQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeCompanyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeCompanyQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeCompanyQuery(baseOptions?: Apollo.QueryHookOptions<MeCompanyQuery, MeCompanyQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeCompanyQuery, MeCompanyQueryVariables>(MeCompanyDocument, options);
      }
export function useMeCompanyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeCompanyQuery, MeCompanyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeCompanyQuery, MeCompanyQueryVariables>(MeCompanyDocument, options);
        }
export type MeCompanyQueryHookResult = ReturnType<typeof useMeCompanyQuery>;
export type MeCompanyLazyQueryHookResult = ReturnType<typeof useMeCompanyLazyQuery>;
export type MeCompanyQueryResult = Apollo.QueryResult<MeCompanyQuery, MeCompanyQueryVariables>;
export const ShiftsDocument = gql`
    query Shifts($id: Int!, $dateTime: String!) {
  scheduledShifts(id: $id, dateTime: $dateTime) {
    employeeId
    startTime
    endTime
    employee {
      firstName
      lastName
    }
  }
}
    `;

/**
 * __useShiftsQuery__
 *
 * To run a query within a React component, call `useShiftsQuery` and pass it any options that fit your needs.
 * When your component renders, `useShiftsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useShiftsQuery({
 *   variables: {
 *      id: // value for 'id'
 *      dateTime: // value for 'dateTime'
 *   },
 * });
 */
export function useShiftsQuery(baseOptions: Apollo.QueryHookOptions<ShiftsQuery, ShiftsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ShiftsQuery, ShiftsQueryVariables>(ShiftsDocument, options);
      }
export function useShiftsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ShiftsQuery, ShiftsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ShiftsQuery, ShiftsQueryVariables>(ShiftsDocument, options);
        }
export type ShiftsQueryHookResult = ReturnType<typeof useShiftsQuery>;
export type ShiftsLazyQueryHookResult = ReturnType<typeof useShiftsLazyQuery>;
export type ShiftsQueryResult = Apollo.QueryResult<ShiftsQuery, ShiftsQueryVariables>;