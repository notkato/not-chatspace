
* ...
## usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|index: true,null: false, default: "", unique: true|
|email|string|null: false, default: ""|
|encrypted_password|string|null: false, default: "", unique: true|

### Association
 has_many :groups,through: members
 has_many :messages
 has_many :members


## messageテーブル
|Column|Type|Options|
|------|----|-------|
|text|string|index: true,null: false|
|image|text|null: false|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
 belongs_to :user
 belongs_to :group


## group_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|references|null: false, foreign_key: true, index: true|
|group_id|references|null: false, foreign_key: true, index: ture|

### Association
 belongs_to :group
 belongs_to :user


## groupテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, defalut: "", unique:true|

### Association
 has_many :users,through: members
 has_many :members
 has_many :messages