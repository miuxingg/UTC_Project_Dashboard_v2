import * as React from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { IBlogApi } from '../../../libs/apis/blog/types';
import ButtonForm from '../../elements/ButtonForm';
import PopupConfirm from '../../elements/PopupConfirm';
import { allBlogSelector } from '../../../redux/blog/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { configSelector } from '../../../redux/config/selectors';
import { setError } from '../../../redux/app';
import { updateConfig } from '../../../redux/config';
import CreateIcon from '@mui/icons-material/Create';
import { IconButton } from '@mui/material';
import { useRouter } from 'next/router';
import { ROUTERS } from '../../../configs/navigators';

function not(a: readonly IBlogApi[], b: readonly IBlogApi[]) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a: readonly IBlogApi[], b: readonly IBlogApi[]) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

export const TransferList: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const allBlog = useSelector(allBlogSelector);
  const config = useSelector(configSelector);

  const allBlogData = React.useMemo(() => {
    const currentConfigBlog = config.blog.map(({ id }) => id);
    const data = allBlog.items.filter(({ id }) => {
      return !currentConfigBlog.includes(id);
    });
    return data;
  }, [config, allBlog]);

  const [checked, setChecked] = React.useState<IBlogApi[]>([]);
  const [left, setLeft] = React.useState<IBlogApi[]>(allBlogData);
  const [right, setRight] = React.useState<IBlogApi[]>(config?.blog);

  const [isPopupConfirm, setIsPopupConfirm] = React.useState<boolean>(false);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value: IBlogApi) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleAllRight = () => {
    if (right.concat(left).length > 3) {
      dispatch(setError({ message: 'Tối đa 3 blog được hiển thị' }));
    } else {
      setRight(right.concat(left));
      setLeft([]);
    }
  };

  const handleCheckedRight = () => {
    if (right.concat(leftChecked).length > 3) {
      dispatch(setError({ message: 'Tối đa 3 blog được hiển thị' }));
    } else {
      setRight(right.concat(leftChecked));
      setLeft(not(left, leftChecked));
      setChecked(not(checked, leftChecked));
    }
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
  };

  const handleSubmit = () => {
    dispatch(updateConfig({ blog: right.map(({ id }) => id) }));
  };

  const customList = (items: readonly IBlogApi[]) => (
    <Paper sx={{ width: 400, height: 500, overflow: 'auto' }}>
      <List dense component='div' role='list'>
        {items.map((value: IBlogApi) => {
          const labelId = `transfer-list-item-${value}-label`;

          return (
            <ListItem
              key={value.id}
              role='listitem'
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    'aria-labelledby': labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value.title} />
              <ListItemIcon>
                <IconButton
                  onClick={() =>
                    router.push(`${ROUTERS.blog.path}/${value.id}`)
                  }
                >
                  <CreateIcon />
                </IconButton>
              </ListItemIcon>
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Paper>
  );

  return (
    <>
      <Grid container spacing={2} justifyContent='center' alignItems='center'>
        <Grid item>{customList(left)}</Grid>
        <Grid item>
          <Grid container direction='column' alignItems='center'>
            <Button
              sx={{ my: 0.5 }}
              variant='outlined'
              size='small'
              onClick={handleAllRight}
              disabled={left.length === 0}
              aria-label='move all right'
            >
              ≫
            </Button>
            <Button
              sx={{ my: 0.5 }}
              variant='outlined'
              size='small'
              onClick={handleCheckedRight}
              disabled={leftChecked.length === 0}
              aria-label='move selected right'
            >
              &gt;
            </Button>
            <Button
              sx={{ my: 0.5 }}
              variant='outlined'
              size='small'
              onClick={handleCheckedLeft}
              disabled={rightChecked.length === 0}
              aria-label='move selected left'
            >
              &lt;
            </Button>
            <Button
              sx={{ my: 0.5 }}
              variant='outlined'
              size='small'
              onClick={handleAllLeft}
              disabled={right.length === 0}
              aria-label='move all left'
            >
              ≪
            </Button>
          </Grid>
        </Grid>
        <Grid item>{customList(right)}</Grid>
      </Grid>
      <ButtonForm
        primaryTextButton='Xác nhận'
        secondaryTextButton='Huỷ'
        onPrimaryButton={() => setIsPopupConfirm(true)}
        onSecondaryButton={() => {}}
      />
      {isPopupConfirm ? (
        <PopupConfirm
          open={true}
          title='Xác nhận'
          content={'Bạn có chắc chắn giữ thay đổi?'}
          onClose={() => {
            setIsPopupConfirm(false);
          }}
          onSubmit={() => {
            handleSubmit();
            setIsPopupConfirm(false);
          }}
        />
      ) : null}
    </>
  );
};

export default TransferList;
