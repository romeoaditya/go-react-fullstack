import {Flex, Spinner, Stack, Text} from "@chakra-ui/react";
import {useQuery} from "@tanstack/react-query";
import TodoItem from "./TodoItem";
import {useColorModeValue} from "./ui/color-mode";
import {BASE_URL} from "../App";

export type Todo = {
  _id: number;
  body: string;
  completed: boolean;
};

const TodoList = () => {
  const {data: todos, isLoading} = useQuery<Todo[]>({
    queryKey: ["todos"],
    queryFn: async () => {
      const res = await fetch(BASE_URL + "/todos");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      return data || [];
    },
  });

  const emptyTextCol = useColorModeValue("gray.500", "gray.400");

  return (
    <>
      <Text
        fontSize="4xl"
        textTransform="uppercase"
        fontWeight="bold"
        textAlign="center"
        my={3}
        bgGradient="linear(to-r, teal.400, blue.400)"
        bgClip="text"
      >
        Today's Tasks
      </Text>

      {isLoading && (
        <Flex justifyContent="center" my={4}>
          <Spinner size="xl" />
        </Flex>
      )}

      {!isLoading && todos?.length === 0 && (
        <Stack alignItems="center" gap="3" my={4}>
          <Text fontSize="xl" textAlign="center" color={emptyTextCol}>
            All tasks completed!
          </Text>
          <img src="/success.gif" alt="Success" width={100} height={100} />
        </Stack>
      )}

      <Stack gap={3}>
        {todos?.map((todo, idx) => (
          <TodoItem key={idx} todo={todo} />
        ))}
      </Stack>
    </>
  );
};

export default TodoList;
